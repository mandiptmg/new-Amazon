interface FormatPriceProps {
  amount: number
}

const FormatPrice: React.FC<FormatPriceProps> = ({ amount }) => {
  // Check if amount is not a number or is undefined, and return an empty string
  if (typeof amount !== 'number' || isNaN(amount)) return ''

  // Format the price using Intl.NumberFormat
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)

  return formattedPrice
}

export { FormatPrice}
