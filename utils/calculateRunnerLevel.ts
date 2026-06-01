type UserProfile = {
    age?: number | null
    weight?: number | null
    height?: number | null
    frequency?: string | null
    pace?: string | null
}

export default function calculateRunnerLevel(profile: UserProfile) {

    let score = 0

    switch (profile.pace) {
        case "< 4:00 /km":
            score += 40
            break

        case "5:00 – 6:00 /km":
            score += 32
            break

        case "6:00 – 7:00 /km":
            score += 24
            break

        case "7:00 – 8:00 /km":
            score += 16
            break

        case "8:00 – 9:00 /km":
            score += 8
            break
    }

    // Frequency
    switch (profile.frequency) {
        case "> 5 x / week":
            score += 35
            break

        case "3 – 4 x / week":
            score += 24
            break

        case "1 – 2 x / week":
            score += 12
            break
    }

    // Age
    if (profile.age != null) {
        if (profile.age <= 25) {
            score += 10
        } else if (profile.age <= 35) {
            score += 8
        } else if (profile.age <= 45) {
            score += 6
        } else if (profile.age <= 55) {
            score += 4
        } else {
            score += 2
        }
    }

    let bmi = 0

    if (
        profile.weight != null &&
        profile.height != null
    ) {
        bmi =
            profile.weight /
            Math.pow(profile.height / 100, 2)

        if (bmi >= 18.5 && bmi <= 24.9) {
            score += 15
        } else if (bmi >= 25 && bmi <= 29.9) {
            score += 10
        } else {
            score += 5
        }
    }

    let level: "Beginner" | "Intermediate" | "Advanced"
    let recommendedPlan:
        | "5K Beginner"
        | "10K Intermediate"
        | "Half Marathon"

    if (score >= 75) {
        level = "Advanced"
        recommendedPlan = "Half Marathon"
    } else if (score >= 50) {
        level = "Intermediate"
        recommendedPlan = "10K Intermediate"
    } else {
        level = "Beginner"
        recommendedPlan = "5K Beginner"
    }

    return {
        score,
        bmi: bmi ? Number(bmi.toFixed(1)) : null,
        level,
        recommendedPlan
    }
}