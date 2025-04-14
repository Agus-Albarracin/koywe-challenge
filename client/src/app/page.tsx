'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '../../public/koywe2.svg';
import { authService } from '@/services/AuthService';
import { toast } from 'react-toastify';

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    
    const email = data?.email?.trim();
    const password = data.password;
    const login = data?.login?.trim();

    try {
      if (isRegistering) {
        const res = await authService.register(email, password, login);
        toast.success(res.message);
      } else {
        await authService.login(login, password);
        toast.success('Inicio de sesión exitoso');
        router.push('/home');
      }
      reset();
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.response?.data?.message || 'Error en autenticación';  
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-black px-4 bg-login">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[var(--color-principal)] text-white p-10 rounded-2xl w-full max-w-md shadow-2xl flex flex-col gap-5"
      >
        <Image
          src={logo}
          alt="Logo Koywe"
          width={250}
          height={250}
          className="mb-2 mx-auto"
        />
        <h2 className="text-3xl font-bold text-center">
          {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
        </h2>

        <input
          {...register('login')}
          required 
          placeholder="Usuario"
          className="p-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-secundario)]"
        />

        {isRegistering && (
          <input
            {...register('email')}
            required 
            type="email"
            placeholder="Email"
            className="p-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-secundario)]"
          />
        )}

        <input
          {...register('password')}
          required 
          type="password"
          placeholder="Contraseña"
          className="p-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-secundario)]"
        />

        <button
          type="submit"
          className="bg-[var(--color-secundario)] text-[var(--color-principal)] font-bold py-2 rounded-lg transition duration-300 hover:brightness-110"
        >
          {isRegistering ? 'Registrarme' : 'Entrar'}
        </button>

        <p className="text-sm text-center">
          {isRegistering ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
          <span
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-[var(--color-terciario)] underline cursor-pointer hover:text-white transition"
          >
            {isRegistering ? 'Inicia sesión' : 'Regístrate'}
          </span>
        </p>
      </form>
    </div>
  );
}

