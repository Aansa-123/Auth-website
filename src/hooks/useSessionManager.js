import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showSessionWarning, hideSessionWarning, clearSession, refreshToken } from '../features/auth/authSlice';

export const useSessionManager = () => {
  const dispatch = useDispatch();
  const { sessionExpiryTime, sessionWarning, user, accessToken } = useSelector(state => state.auth);
  const warningTimeoutRef = useRef(null);
  const expiryTimeoutRef = useRef(null);

  useEffect(() => {
    if (!sessionExpiryTime || !user || !accessToken) {
      // Clear any existing timers if no active session
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
      if (expiryTimeoutRef.current) clearTimeout(expiryTimeoutRef.current);
      return;
    }

    const now = Date.now();
    const timeUntilExpiry = sessionExpiryTime - now;
    const warningTime = 5 * 60 * 1000; // 5 minutes before expiry
    const timeUntilWarning = timeUntilExpiry - warningTime;

    // Clear existing timers
    if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    if (expiryTimeoutRef.current) clearTimeout(expiryTimeoutRef.current);

    // Set warning timer
    if (timeUntilWarning > 0) {
      warningTimeoutRef.current = setTimeout(() => {
        dispatch(showSessionWarning());
      }, timeUntilWarning);
    } else if (timeUntilExpiry > 0) {
      // If less than 5 minutes left, show warning immediately
      dispatch(showSessionWarning());
    }

    // Set expiry timer
    if (timeUntilExpiry > 0) {
      expiryTimeoutRef.current = setTimeout(() => {
        dispatch(clearSession());
      }, timeUntilExpiry);
    } else {
      // Session already expired
      dispatch(clearSession());
    }

    // Cleanup function
    return () => {
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
      if (expiryTimeoutRef.current) clearTimeout(expiryTimeoutRef.current);
    };
  }, [sessionExpiryTime, user, accessToken, dispatch]);

  const extendSession = async () => {
    try {
      dispatch(hideSessionWarning());
      await dispatch(refreshToken()).unwrap();
    } catch (error) {
      console.error('Failed to extend session:', error);
      // If refresh fails, session will be cleared by the expiry timer
    }
  };

  const logout = () => {
    dispatch(clearSession());
    // Clear timers
    if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    if (expiryTimeoutRef.current) clearTimeout(expiryTimeoutRef.current);
  };

  return {
    sessionWarning,
    extendSession,
    logout,
    timeUntilExpiry: sessionExpiryTime ? Math.max(0, sessionExpiryTime - Date.now()) : 0,
  };
};