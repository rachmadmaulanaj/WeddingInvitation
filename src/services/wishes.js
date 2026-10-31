import Data from '../data.json';
import { getSupabaseClient } from '../lib/supabase';
import { nowDateTime } from '../utils/date';

const STORAGE_KEY = 'undangan-nikah-wishes';

function sortWishes(wishes) {
    return [...wishes].sort((first, second) => String(second.date).localeCompare(String(first.date)));
}

function readLocalWishes() {
    if (typeof window === 'undefined') return null;

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;

        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : null;
    } catch {
        return null;
    }
}

function writeLocalWishes(wishes) {
    if (typeof window === 'undefined') return;

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
}

function mapSupabaseWish(item) {
    return {
        name: item.name,
        text: item.message,
        attendance: item.attendance,
        date: item.created_at,
    };
}

export async function getWishes() {
    const supabase = await getSupabaseClient();

    if (supabase) {
        const { data, error } = await supabase
            .from('wishes')
            .select('name, message, attendance, created_at')
            .order('created_at', { ascending: false });

        if (error) throw new Error(error.message);

        return data.map(mapSupabaseWish);
    }

    return sortWishes(readLocalWishes() ?? Data.wellWishes);
}

export async function addWish({ name, text, attendance }) {
    const supabase = await getSupabaseClient();

    if (supabase) {
        const { data, error } = await supabase
            .from('wishes')
            .insert({ name, message: text, attendance })
            .select('name, message, attendance, created_at')
            .single();

        if (error) throw new Error(error.message);

        return mapSupabaseWish(data);
    }

    const newWish = {
        name,
        text,
        attendance,
        date: nowDateTime(),
    };
    const currentWishes = readLocalWishes() ?? Data.wellWishes;
    writeLocalWishes(sortWishes([newWish, ...currentWishes]));

    return newWish;
}
