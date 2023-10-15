export function formatCnpj(cnpj: string): string {
  const formattedCnpj = cnpj.replace(/\D/g, '');

  // Apply the mask: XX.XXX.XXX/XXXX-XX
  return `${formattedCnpj.substring(0, 2)}.${formattedCnpj.substring(
    2,
    5
  )}.${formattedCnpj.substring(5, 8)}/${formattedCnpj.substring(
    8,
    12
  )}-${formattedCnpj.substring(12)}`;
}
