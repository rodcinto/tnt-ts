class UsernameSanitizer {
    static sanitize(username: string): string {
        return username.trim().toLowerCase();
    }
}

export default UsernameSanitizer;
