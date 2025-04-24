import { Breadcrumbs } from '@/components/custom/breadcrumbs';
import CustomIcon from '@/components/custom/CustomIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useInitials } from '@/hooks/UseInitials';
import { UseHeaderScroll } from '@/hooks/UseHeaderScroll';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Bell, ChevronDown, Menu } from 'lucide-react';
import { CustomMenuContent } from './CustomMenuContent';


interface CustomUserHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
    mainNavItems?: NavItem[];
    rightNavItems?: NavItem[];
    leftNavItems?: React.ReactElement;
    className?: string;
}

export function CustomUserHeader({ breadcrumbs = [], mainNavItems = [], rightNavItems = [], leftNavItems, className }: CustomUserHeaderProps) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();
    const { headerProps } = UseHeaderScroll();
    const { url } = usePage()

    const isActive = url === '/about-us' || url === '/contact-us'

    return (
        <>
            <div {...headerProps} className={` ${className}  ${headerProps.className}  bg-silver ${isActive ? 'border' : ''}
      `}>
                {/* Mobile Menu */}
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="mr-2 h-[34px] w-[34px]">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="bg-sidebar flex h-full w-64 flex-col items-stretch justify-between">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            <SheetHeader className="flex justify-start text-left">
                                {leftNavItems}
                            </SheetHeader>
                            <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                                <div className="flex h-full flex-col justify-between text-sm">
                                    <div className="flex flex-col space-y-4">
                                        {mainNavItems.map((item, index) => (
                                            <Link prefetch key={index} href={item.href} className="flex items-center space-x-2 font-medium">
                                                {item.icon && <CustomIcon icon={item.icon} className="h-5 w-5" />}
                                                <span>{item.title}</span>
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="flex flex-col space-y-4">
                                        {rightNavItems.map((item) => (
                                            <Link prefetch
                                                key={item.title}
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center space-x-2 font-medium"
                                            >
                                                {item.icon && <CustomIcon icon={item.icon} className="h-5 w-5" />}
                                                <span>{item.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="flex items-center space-x-2">
                    {leftNavItems}
                </div>

                {/* Desktop Navigation */}
                <div className="hidden h-full flex-grow justify-center lg:flex">
                    <NavigationMenu className="flex h-full items-stretch">
                        <NavigationMenuList className="flex h-full items-stretch space-x-2">
                            {mainNavItems.map((item, index) => {

                                return (
                                    <NavigationMenuItem key={index} className="relative flex h-full items-center">
                                        <Link
                                            prefetch
                                            href={item.href}
                                            className={cn(navigationMenuTriggerStyle(), 'h-9 cursor-pointer px-8')}
                                        >
                                            {item.icon && <CustomIcon icon={item.icon} className="mr-2 h-4 w-4" />}
                                            {item.title}
                                        </Link>
                                    </NavigationMenuItem>
                                );
                            })}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="ml-auto flex items-center">
                    {auth.user ? (
                        <>
                            <div className="ml-auto flex items-center gap-x-10">
                                <Bell className="h-8 cursor-pointer hover:text-s3" />
                                <span className='bg-red-600 text-white rounded-2xl px-[7px] py-[2px] text-xs absolute mb-6 ml-3 cursor-pointer'>3</span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="flex items-center gap-x-5">
                                            <Avatar className="size-8 overflow-hidden rounded-full">
                                                <AvatarImage src={auth.user.user_photopath} alt={auth.user.username} />
                                                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                    {getInitials(auth.user.username)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col items-start gap-1 text-sm">
                                                {auth.user.username}
                                                <span className="text-xs">{`${auth.user.resident_lastname}, ${getInitials(auth.user.resident_firstname)}`}</span>
                                            </div>
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end">
                                        <CustomMenuContent user={auth.user} />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                        </>
                    ) : (
                        <div className="space-x-2 hidden lg:flex">
                            {rightNavItems.map((item, index) => (
                                <Link prefetch href={item.href} key={index}>
                                    <Button variant="plain">{item.title}</Button>
                                </Link>
                            ))}
                        </div>
                    )
                    }
                </div>
            </div>

            {breadcrumbs.length > 1 && (
                <div className="border-sidebar-border/70 flex w-full border-b">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
