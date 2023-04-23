export const discordUsers = [{id: '251697463235313664'}];
export const localUsers = [];

export function checkUsers(provider: string, user: any) {

    let existingUser: any;

    switch (provider) {
        case 'discord': {
            // @ts-ignore
            existingUser = discordUsers.find(data => data.id === user.id);
            return existingUser;
        }
        case 'local': {
            // @ts-ignore
            existingUser = localUsers.find(data => data.id === user.id);
            return existingUser;
        }
    }
}
