import DeleteQuestionButtonClient from "./DeleteQuestionButtonClient";

export default function DeleteQuestionButton({
  id,
}: {
  id: string;
}) {
  return (
    <DeleteQuestionButtonClient id={id} />
  );
}