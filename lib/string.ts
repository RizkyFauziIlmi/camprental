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

/**
 * Retrieves the last name from a full name.
 * 
 * @param fullName - The full name from which to extract the last name.
 * @returns The last name extracted from the full name.
 */
export function getLastName(fullName: string) {
  // Split the full name into words
  var nameParts = fullName.split(" ");

  // Extract the last word as the last name
  var lastName = nameParts[nameParts.length - 1];

  return lastName;
}

/**
 * Extracts the first name from a full name.
 * 
 * @param fullName - The full name from which to extract the first name.
 * @returns The first name extracted from the full name.
 */
export function getFirstName(fullName: string) {
  // Split the full name into words
  var nameParts = fullName.split(" ");

  // Extract the first word as the first name
  var firstName = nameParts[0];

  return firstName;
}