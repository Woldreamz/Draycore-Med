import { Suspense } from 'react';
import UpdateEquipment from './UpdateEquipment';

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateEquipment />
    </Suspense>
  );
}