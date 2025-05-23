import { useEffect, useState } from 'react';
import { createMailAPI, refreshMailAPI } from '../service/allAPI';
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Copy, RefreshCw, Trash2 } from 'lucide-react'
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import {
    InboxIcon,
    StarIcon,
    ArchiveBoxIcon,
    TrashIcon,
    TagIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../components/ui/alert-dialog"

const navigation = [
    { name: 'Inbox', icon: InboxIcon, count: 12 },
    { name: 'Starred', icon: StarIcon, count: 3 },
    { name: 'Archived', icon: ArchiveBoxIcon },
    { name: 'Trash', icon: TrashIcon },
    { name: 'Labels', icon: TagIcon },
    { name: 'Settings', icon: Cog6ToothIcon },
];

export default function Sidebar({ onEmailsUpdate }) {
    const [selected, setSelected] = useState('Inbox');
    const [emailAddress, setEmailAddress] = useState('Loading...')
    const [selectedEmail, setSelectedEmail] = useState(null)
    const [emails, setEmails] = useState([])
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { toast } = useToast()

    useEffect(() => {
        const fetchEmail = async () => {

            const storedEmail = localStorage.getItem('flickMail');

            if (storedEmail) {

                setEmailAddress(storedEmail);
                return;
            }


            try {
                const response = await createMailAPI();
                if (response.status === 200 && response.data.length > 0) {
                    const userEmail = response.data[0].user;
                    const userPassword = response.data[0].pwd;
                    setEmailAddress(userEmail);

                    localStorage.setItem('flickMail', userEmail);
                    localStorage.setItem('flickMailPwd', userPassword);
                } else {
                    console.error("Failed to fetch email or empty response");
                    setEmailAddress("Error loading email");
                }
            } catch (error) {
                console.error("Error fetching email:", error);
                setEmailAddress("Error loading email");
            }
        };

        fetchEmail();
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(emailAddress)
        toast({
            variant: "outline",
            className: 'bg-green-600',
            title: "Email copied to clipboard!",
            position: 'top-center'
        });
    }

    const handleDelete = () => {
        setShowDeleteDialog(true);
    }
    const handleConfirmDelete = async () => {

        localStorage.removeItem('flickMail');
        localStorage.removeItem('flickMailPwd');
        localStorage.removeItem('flickMailJWT');
        try {

            const response = await createMailAPI();

            if (response.status === 200 && response.data.length > 0) {
                const userEmail = response.data[0].user;
                const userPassword = response.data[0].pwd;


                setEmailAddress(userEmail);


                localStorage.setItem('flickMail', userEmail);
                localStorage.setItem('flickMailPwd', userPassword);
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
                toast({
                    variant: "outline",
                    className: 'bg-green-600',
                    title: "Current email deleted, new one generated",
                    position: 'top-center'
                });
            } else {
                console.error("Failed to fetch email or empty response");
                setEmailAddress("Error loading email");
            }
        } catch (error) {
            console.error("Error fetching email:", error);
            setEmailAddress("Error loading email");
        }

        setShowDeleteDialog(false);
    };

    const handleRefresh = async () => {
        try {
            const storedEmail = localStorage.getItem('flickMail');
            const storedPassword = localStorage.getItem('flickMailPwd');
            if (!storedEmail || !storedPassword) {
                throw new Error('Email credentials not found');
            }
            const refreshResponse = await refreshMailAPI({
                address: storedEmail,
                password: storedPassword
            });
            if (refreshResponse.status === 200) {

                const jwtToken = refreshResponse.data.jwtToken;
                localStorage.setItem('flickMailJWT', jwtToken);


                const receivedEmails = refreshResponse.data.messages?.['hydra:member'] || [];
                console.log('Received Emails:', receivedEmails);
                setEmails(receivedEmails);
                onEmailsUpdate(receivedEmails);
            } else {
                throw new Error('Refresh failed');
            }
        } catch (error) {
            console.error("Error refreshing emails:", error);
            setEmails([]);
            onEmailsUpdate([]);
        }
    };

    return (
        <div className="w-[255px] bg-white dark:bg-gray-800 border-r dark:border-gray-700">
            <div className="p-2">
                <h2 className="text-3xl font-semibold mb-2">Temporary Email</h2>
                <p className="text-zinc-400 text-sm mb-4">Copy this email address to use it anywhere</p>
                <div className="flex gap-2 mb-4">
                    <Input
                        value={emailAddress}
                        readOnly
                        className="bg-zinc-800 border-zinc-700 text-white"
                    />
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 border-zinc-700 hover:bg-gray-200"
                        onClick={handleCopy}
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="flex-1 border-zinc-700 hover:text-blue-600"
                        onClick={handleRefresh}
                    >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                    </Button>


                    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="outline"
                                className="flex-1 border-zinc-700 hover:text-red-600"
                                onClick={handleDelete}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    temporary email address and remove all associated data.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>


                    {/* <Button
                        variant="outline"
                        className="flex-1 border-zinc-700 hover:text-red-600"
                        onClick={handleDelete}
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </Button> */}
                </div>
            </div>
            <div className='mt-[243px]'>
                <Button variant="secondary" className='rounded-none bg-gray-100 w-[255px] hover:bg-blue-300'>Contact us</Button>
                <Button variant="secondary" className='rounded-none bg-gray-100 w-[255px] hover:bg-blue-300'>Privacy</Button>
                <Button variant="secondary" className='rounded-none bg-gray-100 w-[255px] hover:bg-blue-300'>Terms</Button>
                <Button variant="secondary" className='rounded-none bg-gray-100 w-[255px] hover:bg-blue-300'>Help Center</Button>
                <Button variant="secondary" className='rounded-none bg-gray-100 w-[255px] hover:bg-blue-300'>FAQ</Button>
                <Button variant="secondary" className='rounded-none bg-gray-100 w-[255px] hover:bg-blue-300'>Feedback</Button>
            </div>
            <div className='bg-gray-200'>
                {/* <p className='text-sm'>© FlickMail 2024</p> */}
            </div>
            <Toaster />
        </div>
    );
}