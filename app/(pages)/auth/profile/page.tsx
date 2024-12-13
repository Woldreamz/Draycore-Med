import { Suspense } from 'react';
import UserDetailsPage from './UserDetails';

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserDetailsPage />
    </Suspense>
  );
}