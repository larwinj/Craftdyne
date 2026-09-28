import { createVisitorStore, handleVisitors } from '../server/visitors.js';

const store = createVisitorStore(process.env);

const clientIp = (request) =>
  request.headers.get('x-real-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0].trim();

const handle = (request) => handleVisitors(request, { store, ip: clientIp(request) });

export { handle as GET, handle as POST };
