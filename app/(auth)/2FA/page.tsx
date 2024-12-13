import { Suspense } from 'react';
import AuthCode from './2FA';

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCode />
    </Suspense>
  );
}