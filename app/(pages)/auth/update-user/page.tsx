import { Suspense } from 'react';
import UpdateUser from './UpdateUser';

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateUser />
    </Suspense>
  );
}