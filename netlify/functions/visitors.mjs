import { createVisitorStore, handleVisitors } from '../../server/visitors.js';

const store = createVisitorStore(process.env);

export default (request, context) => handleVisitors(request, { store, ip: context.ip });

export const config = { path: '/api/visitors' };
