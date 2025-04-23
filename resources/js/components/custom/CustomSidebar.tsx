import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import CustomIcon from './CustomIcon';
import { Link, usePage } from '@inertiajs/react';

interface CustomSidebarProps extends React.ComponentProps<typeof Sidebar> {
    navItems: NavItem[];
    navTitle?: React.ReactNode;
}



export function CustomSidebar({ navItems, navTitle, ...props }: CustomSidebarProps) {
    const { url } = usePage()

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex w-full flex-col items-center justify-center">
                            {navTitle}
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {navItems.map((item) => {
                            const relativePathStart = item.href.indexOf('/', 8);
                            const isActive = item.href.startsWith(url, relativePathStart);

                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={isActive}>
                                        <Link prefetch href={item.href} className='flex items-center gap-5 font-medium'>
                                            {item.icon && <item.icon className="ml-5 h-5 w-5" />}
                                            {item.title}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
