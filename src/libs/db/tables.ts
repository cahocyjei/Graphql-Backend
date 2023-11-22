import { initizializeTableRoles } from "@libs/setup/initialsetup";
import { initizializeTableUser } from "@libs/setup/initialsetup";

export async function InitializeTables(){
    await initizializeTableRoles();
    await initizializeTableUser();
}