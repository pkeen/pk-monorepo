"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { lessonDTO, Lesson } from "@pete_keen/courses/validators";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { editLesson } from "@/lib/actions/lesson/editLesson";
import { deleteLesson } from "@/lib/actions/lesson/deleteLesson";
import { ConfirmDeleteLessonDialog } from "./confirm-delete-lesson-dialog";
import { useState } from "react";
import { LessonUsage } from "@pete_keen/courses/types";

const lessonEditFormSchema = lessonDTO.extend({
	description: z.string().optional(),
});

export const LessonEditForm = ({
	lesson,
	lessonUsage,
}: {
	lesson: Lesson;
	lessonUsage?: LessonUsage;
}) => {
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const router = useRouter();
	const form = useForm({
		resolver: zodResolver(lessonEditFormSchema),
		defaultValues: {
			id: lesson.id,
			name: lesson.name,
			description: lesson.description ?? "",
			isPublished: lesson.isPublished ?? false,
		},
	});

	const onSubmit = async (values: z.infer<typeof lessonEditFormSchema>) => {
		try {
			await editLesson(values);
			toast.success("Lesson updated!");
			form.reset(values);
			router.refresh(); // reload data if you're on the same page
		} catch (err) {
			toast.error("Something went wrong updating the lesson.");
			console.error(err);
		}
	};

	const handleDelete = async () => {
		try {
			await deleteLesson(lesson.id);
			toast.success("Lesson deleted!");
			router.push("/admin/courses");
		} catch (err) {
			toast.error("Something went wrong deleting the lesson.");
			console.error(err);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="font-medium">Edit Lesson</CardTitle>
				</CardHeader>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="isPublished"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
							<FormLabel>Published Lesson</FormLabel>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="mt-4 cursor-pointer"
					disabled={
						!form.formState.isDirty || form.formState.isSubmitting
					}
				>
					Save Lesson
				</Button>
				<Button
					type="button"
					variant="outline"
					className="ml-2 mt-4 cursor-pointer"
					onClick={() => {
						router.back();
					}}
				>
					Cancel
				</Button>
				<Button
					type="button"
					variant="destructive"
					className="ml-2 mt-4 cursor-pointer"
					onClick={() => {
						setOpenDeleteDialog(true);
					}}
				>
					Delete
				</Button>
				<ConfirmDeleteLessonDialog
					open={openDeleteDialog}
					setOpen={setOpenDeleteDialog}
					onConfirm={() => {
						handleDelete();
					}}
					actionVerb="Delete"
					lessonUsage={lessonUsage}
				/>
			</form>
		</Form>
	);
};
