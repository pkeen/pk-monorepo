import { courses } from "@/courses";
import { LessonEditForm } from "@/lib/components/course-builder/lessons/lesson-edit-form";

export default async function LessonEditPage({
	params,
}: {
	params: { id: string };
}) {
	const { id } = await params;
	const lesson = await courses.lesson.get(parseInt(id));
	const lessonUsage = await courses.lesson.findUsage(parseInt(id));
	const videos = await courses.video.list();
	return lesson ? (
		<LessonEditForm
			lesson={lesson}
			lessonUsage={lessonUsage}
			videos={videos}
		/>
	) : (
		<div>Lesson not found</div>
	);
}
