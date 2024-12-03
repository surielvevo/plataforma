import { describe, it, expect, vi } from 'vitest';
import { login } from '../store/slices/authSlice';
import { store } from '../store';

describe('Auth Slice', () => {
  it('should handle login success', async () => {
    const mockUser = {
      email: 'test@example.com',
      password: 'password123'
    };

    const result = await store.dispatch(login(mockUser));
    expect(result.type).toBe('auth/login/fulfilled');
  });
}); 