
export default function formatDuration(duration: number) {
    return (
        duration.toString().padStart(2, "0")
    )
}
