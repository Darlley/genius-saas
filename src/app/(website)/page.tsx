import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className=''>
      <Button>
        <Link href="/sign-in">SignIn</Link>
      </Button>
      <Button>
        <Link href="/sign-up">SignOut</Link>
      </Button>
    </div>
  );
}
