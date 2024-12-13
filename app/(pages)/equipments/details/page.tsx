import { Suspense } from 'react';
import EquipmentDetails from './Details';

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EquipmentDetails />
    </Suspense>
  );
}