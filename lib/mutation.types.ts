export interface CreateUserArgs {
  clerkId: string;
  email: string;
}

export interface CreateJournalEntryArgs {
  userId: string;
  content: string;
}
