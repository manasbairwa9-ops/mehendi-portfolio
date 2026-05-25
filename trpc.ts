import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@mehndi/api';

export const trpc = createTRPCReact<AppRouter>();
