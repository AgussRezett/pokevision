import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useSounds } from '@/hooks/useSounds';
import styles from './Navbar.module.scss';
import Logo from '@assets/logo.svg';
import { SignOutIcon, UserCircleIcon } from '@phosphor-icons/react';
import LoginModal from '@/components/layout/components/Navbar/components/LoginModal/LoginModal';
import ThemeToggleButton from '@/components/layout/components/Navbar/components/ThemeToggleButton/ThemeToggleButton';

export default function Navbar() {
  const { play } = useSounds();
  const { user, signInWithGoogle, signOut } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        if (showUserMenu) {
          // eslint-disable-next-line react-hooks/immutability
          handleCloseMenu();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  const handleCloseMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowUserMenu(false);
      setIsClosing(false);
    }, 200); // Duración de la animación
  };

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      play('back');
      await signOut();
      handleCloseMenu();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <Link to="/" className={styles.brand} onClick={() => play('start')}>
            <div className={styles.logo}>
              <img src={Logo} className={styles.image} />
            </div>
            <div className={styles.brandText}>
              <h1>Pokevision</h1>
              <p>Exclusivamente Pokémon</p>
            </div>
          </Link>

          <div className={styles.navActions}>
            <ThemeToggleButton />
            {user ? (
              <div className={styles.userMenu} ref={userMenuRef}>
                <button
                  className={styles.userButton}
                  onClick={() => {
                    play('select');
                    setShowUserMenu(!showUserMenu);
                    setIsClosing(false);
                  }}
                >
                  {user.user_metadata.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt={user.user_metadata.full_name}
                      className={styles.userAvatar}
                    />
                  ) : (
                    <UserCircleIcon size={32} weight="fill" />
                  )}
                </button>

                {showUserMenu && (
                  <div
                    className={`${styles.dropdown} ${isClosing ? styles.closing : ''}`}
                  >
                    <div className={styles.dropdownHeader}>
                      <p className={styles.userName}>
                        {user.user_metadata.full_name}
                      </p>
                      <p className={styles.userEmail}>{user.email}</p>
                    </div>
                    <button
                      className={styles.logoutButton}
                      onClick={handleLogout}
                    >
                      <SignOutIcon size={18} weight="bold" />
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className={styles.loginButton}
                onClick={() => {
                  play('select');
                  setShowLoginModal(true);
                }}
              >
                <UserCircleIcon size={20} weight="bold" />
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      </nav>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onGoogleLogin={handleLogin}
      />
    </>
  );
}
