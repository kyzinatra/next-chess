import type { Modifier, ClientRect } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";

function restrictToBoundingRect(transform: Transform, rect: ClientRect, boundingRect: ClientRect): Transform {
	const value = {
		...transform,
	};
	const rectCopy = {
		...rect,
	};
	rectCopy.left += 20;
	rectCopy.right -= 20;

	rectCopy.top += 10;
	rectCopy.bottom -= 10;

	if (rectCopy.top + transform.y <= boundingRect.top) {
		value.y = boundingRect.top - rectCopy.top;
	} else if (rectCopy.bottom + transform.y >= boundingRect.top + boundingRect.height) {
		value.y = boundingRect.top + boundingRect.height - rectCopy.bottom;
	}

	if (rectCopy.left + transform.x <= boundingRect.left) {
		value.x = boundingRect.left - rectCopy.left;
	} else if (rectCopy.right + transform.x >= boundingRect.left + boundingRect.width) {
		value.x = boundingRect.left + boundingRect.width - rectCopy.right;
	}

	return value;
}

export const restrictToNodeEdges: (ref: React.RefObject<HTMLElement | null>) => Modifier =
	(ref) =>
	({ transform, draggingNodeRect }) => {
		if (!draggingNodeRect || !ref.current) {
			return transform;
		}

		const rect = ref.current.getBoundingClientRect();

		return restrictToBoundingRect(transform, draggingNodeRect, rect);
	};
