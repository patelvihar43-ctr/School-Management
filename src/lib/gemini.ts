// Mock service to replace AI API calls
export const generateLessonPlan = async (topic: string, ageGroup: string) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return `
# Lesson Plan: ${topic}
**Age Group:** ${ageGroup}
**Duration:** 60 minutes

## 1. Learning Objectives
- Explore primary characteristics of ${topic}.
- Encourage curiosity through sensory exploration.
- Develop social-emotional skills through collaborative play.

## 2. Materials Needed
- Interactive slides
- Texture samples and sensory bins
- Related children's literature

## 3. Activities
### Introduction (10 mins)
Engage the group with a warm-up activity related to ${topic}.

### Main Activity (40 mins)
A hands-on workshop focused on exploring ${topic} in depth.

### Conclusion (10 mins)
A cool-down circle to share discoveries and clean up.

## 4. Assessment
Observation of student engagement and participation during group activities.
  `.trim();
};

export const summarizeStudentProgress = async (studentName: string, milestones: any[]) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return `${studentName} is demonstrating exceptional focus and enthusiasm during our recent sessions. They have successfully navigated new social dynamic and are showing a strong aptitude for creative expression. We are encouraged by their steady progress and look forward to further exploring their unique talents.`;
};
