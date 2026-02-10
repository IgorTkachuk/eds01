import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statement = {
    ...defaultStatements, 
    request: ["viewAll"],
} as const;

export const ac = createAccessControl(statement);

export const adminRole = ac.newRole({
    request: ["viewAll"],
    ...adminAc.statements, 
});