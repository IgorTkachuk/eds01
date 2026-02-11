import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statement = {
    ...defaultStatements, 
    request: ["viewOwn", "viewAll"],
} as const;

export const ac = createAccessControl(statement);

export const adminRole = ac.newRole({
    request: ["viewOwn", "viewAll"],
    ...adminAc.statements, 
});

export const userRole = ac.newRole({
    request: ["viewOwn"]
})