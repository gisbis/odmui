import { PropsWithChildren } from 'react'

import { WithSidebarsLayout, FullScreenPageLayout } from 'shared/ui/layouts'

interface IMapPageLayoutProps extends PropsWithChildren {
	isOpenLeftSidebar: boolean
	isOpenRightSidebar: boolean
	leftSidebarComponent?: JSX.Element
	rightSidebarComponent?: JSX.Element
}

export const MapPageLayout: React.FC<IMapPageLayoutProps> = ({
	children,
	...otherProps
}) => {
	return (
		<FullScreenPageLayout>
			<WithSidebarsLayout
				leftSidebarWidth={415}
				rightSidebarWidth={315}
				{...otherProps}
			>
				{children}
			</WithSidebarsLayout>
		</FullScreenPageLayout>
	)
}
