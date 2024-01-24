import { supabase } from '../client';

const ENTITY_NAME = 'orders';

export const getOrders = async () =>
  await supabase
    .from(ENTITY_NAME)
    .select(`id, created_at, payment_method, status, total, users!orders_user_id_fkey (id, first_name, last_name)`)
    .order('created_at', { ascending: false });

export const getOrder = async (id) =>
  await supabase
    .from(ENTITY_NAME)
    .select(
      'id, created_at, payment_method, status, products, voucher_url, total, users!orders_user_id_fkey (id, first_name, last_name, direction, direction_detail), orders_driver_user_fkey (id, first_name, last_name)'
    )
    .eq('id', id);

export const getTotalFromAllOrders = async () => await supabase.from(ENTITY_NAME).select('id, total').eq('status', 'entregado');

export const getLastOrders = async () =>
  await supabase
    .from(ENTITY_NAME)
    .select('id, total, created_at, users!orders_user_id_fkey (first_name, last_name, direction)')
    .limit(6)
    .order('created_at', { ascending: false });
