class Email {
  private readonly value: string;

  constructor(value: string) {
    if (!this.verifyFormat(value)) {
      throw new Error('Invalid email format');
    }
    this.value = value;
  }

  public getValue(): string {
    return this.sanitize();
  }

  private verifyFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    const [_, domain] = email.split('@');
    if (domain.indexOf('.') === -1) {
      return false;
    }

    return true;
  }

  private sanitize(): string {
    return this.value.trim().toLowerCase();
  }
}

export default Email;
