import { supabase } from "./supabaseClient"

export async function insertData(table, data){
    const {error} = await supabase
        .from(table)
        .insert(data)
    return !error
}

export async function updateData(table, data, id){
    const { error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
    return !error
}

export async function mostrarTodos(table, columnas = '*'){
    const {data:resultado, error} = await supabase
    .from(table)
    .select(columnas)
    return {resultado, error}
}

