/**
 * Converts a username to an avatar fallback by extracting the initials.
 * @param username - The username to convert.
 * @returns The initials of the username in uppercase.
 */
export function convertUsernameToAvatarFallback(username: string): string {
  const initials = username
    .split(" ")
    .map((name) => name.charAt(0))
    .join("");

  return initials.toUpperCase();
}

/**
 * Converts a float number into Indonesian Rupiah (IDR) format.
 * @param amount - The float number to convert.
 * @returns The amount in IDR format.
 */
export function convertFloatToIDR(amount: number): string {
    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    });
    return formatter.format(amount);
}