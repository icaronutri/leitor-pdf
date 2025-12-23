
import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => {
      onLogin();
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark relative">
      <header className="flex flex-col items-center pt-12 pb-6 px-6">
        <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary">
          <span className="material-symbols-outlined text-4xl">menu_book</span>
        </div>
        <h1 className="text-text-main dark:text-white text-3xl font-bold tracking-tight mb-2">LionReader</h1>
        <p className="text-text-sub text-center text-sm font-normal">Sua biblioteca pessoal aguarda.</p>
      </header>

      <main className="flex-1 px-6 pb-6 w-full flex flex-col gap-6">
        {/* Tabs */}
        <div className="flex p-1 bg-[#EBEAE6] dark:bg-white/5 rounded-xl">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 flex items-center justify-center py-2.5 text-sm font-medium rounded-lg transition-all ${
              mode === 'login' ? 'bg-white text-primary shadow-sm dark:bg-primary dark:text-white' : 'text-text-muted'
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 flex items-center justify-center py-2.5 text-sm font-medium rounded-lg transition-all ${
              mode === 'signup' ? 'bg-white text-primary shadow-sm dark:bg-primary dark:text-white' : 'text-text-muted'
            }`}
          >
            Cadastrar
          </button>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="group">
            <label className="block text-xs font-medium text-text-sub mb-1.5 ml-1">Email</label>
            <div className="relative">
              <input
                className="w-full bg-white dark:bg-white/5 border border-[#E1E1DF] dark:border-white/10 rounded-xl px-4 py-3.5 pl-11 text-base text-text-main dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="nome@exemplo.com"
                required
                type="email"
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none group-focus-within:text-primary transition-colors">
                mail
              </span>
            </div>
          </div>

          <div className="group">
            <label className="block text-xs font-medium text-text-sub mb-1.5 ml-1">Senha</label>
            <div className="relative">
              <input
                className="w-full bg-white dark:bg-white/5 border border-[#E1E1DF] dark:border-white/10 rounded-xl px-4 py-3.5 pl-11 text-base text-text-main dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-12"
                placeholder="Sua senha secreta"
                required
                type="password"
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none group-focus-within:text-primary transition-colors">
                lock
              </span>
              <button className="absolute right-0 top-0 h-full px-4 text-gray-400 hover:text-text-sub transition-colors flex items-center justify-center focus:outline-none focus:text-primary" type="button">
                <span className="material-symbols-outlined text-xl">visibility</span>
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <a className="text-sm font-medium text-primary hover:text-primary-dark dark:hover:text-white transition-colors" href="#">
              Esqueceu a senha?
            </a>
          </div>

          <button className="mt-2 w-full bg-primary hover:bg-primary-dark text-white font-semibold text-lg py-3.5 rounded-xl shadow-soft hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2" type="submit">
            <span>{mode === 'login' ? 'Acessar Biblioteca' : 'Criar Conta'}</span>
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-300 dark:border-white/10"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase tracking-wider">Ou continue com</span>
          <div className="flex-grow border-t border-gray-300 dark:border-white/10"></div>
        </div>

        <button className="w-full bg-white dark:bg-white/5 border border-[#E1E1DF] dark:border-white/10 text-text-main dark:text-white font-medium text-base py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-white/10 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3">
          <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
          </svg>
          Google
        </button>

        <p className="mt-auto text-center text-xs text-text-sub leading-relaxed">
          Ao continuar, você concorda com nossos <a className="underline hover:text-primary transition-colors" href="#">Termos de Serviço</a> e <a className="underline hover:text-primary transition-colors" href="#">Política de Privacidade</a>.
        </p>
      </main>

      {/* Toast Notification */}
      {showToast && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] z-50">
          <div className="flex items-center gap-3 bg-white dark:bg-[#2C2C2C] border-l-4 border-primary rounded-lg shadow-xl shadow-black/10 p-4 pr-3">
            <div className="flex-shrink-0 text-primary">
              <span className="material-symbols-outlined icon-filled">check_circle</span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-text-main dark:text-white">Bem-vindo(a) de volta!</h3>
              <p className="text-xs text-text-sub mt-0.5">Login realizado com sucesso.</p>
            </div>
            <button onClick={() => setShowToast(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
