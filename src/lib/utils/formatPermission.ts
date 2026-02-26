/**
 * Converts a permission identifier to a human-readable format
 * 
 * Examples:
 * - "role.view" -> "Role View"
 * - "adminUser.create" -> "Admin User Create"
 * - "upgradeRequest.approve" -> "Upgrade Request Approve"
 * - "dashboard.totalShipment" -> "Dashboard Total Shipment"
 * 
 * @param permission - The permission identifier (e.g., "role.view", "adminUser.create")
 * @returns A formatted, human-readable permission name
 */
export function formatPermission(permission: string): string {
  if (!permission) return "";

  return permission
    // Split by dots first
    .split(".")
    .map((part) => {
      // Handle camelCase: insert space before uppercase letters
      // e.g., "adminUser" -> "admin User"
      const camelCaseSplit = part.replace(/([a-z])([A-Z])/g, "$1 $2");
      
      // Split by underscores and hyphens
      const words = camelCaseSplit.split(/[_\-\s]+/);
      
      // Capitalize first letter of each word
      return words
        .map((word) => {
          if (!word) return "";
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(" ");
    })
    .join(" ");
}

