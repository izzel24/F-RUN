
export default function formatDuration(seconds: number) {
    const minutes = Math.floor(seconds / 60)
    const remainSeconds = seconds % 60
    return (
        `${minutes.toString().padStart(2, "0")}:${remainSeconds.toString().padStart(2, "0")}`
    )
}
