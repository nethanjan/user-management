export default function LoadingView() {
	return (
		<div className="flex justify-center items-center py-10">
			<div
				data-testid="loading-spinner"
				className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"
			></div>
		</div>
	);
}
