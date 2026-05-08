// Mock service to replace AI API calls
export async function generateLessonPlan(level: string, topic: string) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    title: `${topic} Exploration for ${level}`,
    duration: "45 Minutes",
    goals: [
      `Understand basic concepts of ${topic}`,
      "Develop curiosity and engagement",
      "Practice fine motor skills through related activities"
    ],
    activities: [
      {
        name: "Discovery Circle",
        description: `Introduction to ${topic} using visual aids and storytelling.`
      },
      {
        name: "Hands-on Workshop",
        description: `Interactive session where children experiment with elements of ${topic}.`
      },
      {
        name: "Review & Reflection",
        description: "Group discussion about what we learned today."
      }
    ],
    materials: [
      "Visual flashcards",
      "Craft supplies",
      "Related storybooks"
    ]
  };
}

export async function generateChildInsights(studentName: string, recentActivities: string[]) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return {
    insight: `${studentName} has shown remarkable progress in cognitive tasks and social interaction today.`,
    trendScore: "15%",
    topTalent: "Creative Problem Solving",
    nextMilestone: "Advanced Spatial Reasoning"
  };
}
