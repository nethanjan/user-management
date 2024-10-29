export default function ErrorView({ errorMessage }: ErrorViewProps) {
	return (
		<div className="flex justify-center items-center py-10">
			<p className="text-red-500">{errorMessage}</p>
		</div>
	);
}
