export type Category = 'king' | 'fighter' | 'adviser' | 'squire';

export const MESSAGES: Record<Category, string> = {
    king: "You're all to die!",
    fighter: 'I hit first and ask later',
    adviser: 'I dunno know why, but I believe I am gonna die soon',
    squire: 'I am a real loser',
};
