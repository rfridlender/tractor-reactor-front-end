export default function translateDate(creationDate: string): string {
  const minuteDifference: number = (new Date().valueOf() - new Date(creationDate).valueOf()) / 60000
  return minuteDifference <= 60 ? `${Math.floor(minuteDifference)}m ago` :
    minuteDifference / 60 <= 24 ? `${Math.floor(minuteDifference / 60)}h ago` :
    `${Math.floor(minuteDifference / 60 / 24)}d ago`
}