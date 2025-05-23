import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Toaster } from "../components/ui/toaster"
import { useToast } from "../hooks/use-toast"
import EmailHeader from '../components/EmailHeader';
import EmailSidebar from '../components/EmailSiderbar';
import EmailList from '../components/EmailList';
import EmailView from '../components/EmailView';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
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
import { Button } from "../components/ui/button"
import { useNavigate } from 'react-router-dom';

function Mail() {
  const navigate = useNavigate()
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [emails, setEmails] = useState([]);
  const { toast } = useToast()

  // const handleHome = () => {
  //   navigate('/')
  // };

  // const handleClose = () => {
  //   const tempEmail = localStorage.getItem('tempEmail');
    
  //   if (!tempEmail) {
  //     setShowAlert(true);
  //     toast({
  //       variant: "outline",
  //       className: 'bg-red-600',
  //       title: "Please login/create an account to access FlickMail.",
  //       position: 'top-center'
  //     });
  //   }
  
  // };

  // useEffect(() => {
  //   if (isDarkMode) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // }, [isDarkMode]);

  // const toggleDarkMode = () => {
  //   setIsDarkMode(!isDarkMode);
  // };


  // useEffect(() => {
  //   const tempEmail = localStorage.getItem('tempEmail');
  //   if (!tempEmail) {
  //     setShowAlert(true);
  //   }else{
  //     setShowAlert(false);
  //   }
  // }, []);


  // const handleCreateButtonClick = () => {
  //   toast({
  //     variant: "outline",
  //     className: 'bg-green-600',
  //     title: "Account Created Successfully",
  //     position: 'top-center'
  //   });
  // };
  

  const handleEmailSelect = (email) => {
    console.log('Selected email:', email); 
    setSelectedEmail(email);
  };

  const handleEmailsUpdate = (newEmails) => {
    setEmails(newEmails);
  };

  return (
    
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
       <div>
      {showAlert && (
        <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
          <AlertDialogContent className='h-60 w-[460px]'>
            <AlertDialogHeader>
            <Button onClick={handleHome} className='border-black w-20' variant="outline" size="icon">
             <ChevronLeft /> Home
             </Button>
             <Button onClick={handleClose} className='border-black absolute top-[15px] left-[390px]' variant="outline" size="icon">
             <X/> 
             </Button>
              {/* <AlertDialogTitle>Create Temporary Email Account</AlertDialogTitle> */}
              <AlertDialogDescription>
                Create a new temporary mail account or login to existing account
              </AlertDialogDescription>
            </AlertDialogHeader>
            {/* <AlertDialogFooter> */}
              {/* <AlertDialogCancel onClick={() => setShowAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction> */}
            <div>
            <Button onClick={handleCreateButtonClick} className='mt-2 ml-[120px]'>
              Create A New Account
            </Button> <br /> 
            

            <Dialog>
      <DialogTrigger asChild>
      <Button className='mt-3 ml-28'>Login To Existing Account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Email :
            </Label>
            <Input id="name"  className="col-span-3 border-gray-900" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Password :
            </Label>
            <Input id="username"  className="col-span-3 border-gray-900" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Login</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

            </div>
            {/* </AlertDialogFooter> */}
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
      <EmailHeader  />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-64 flex-shrink-0">
          <EmailSidebar onEmailsUpdate={handleEmailsUpdate} />
        </div>
        <div className="w-[370px] flex-shrink-0 border-x dark:border-gray-700">
          <EmailList 
            onSelectEmail={handleEmailSelect}  
            emails={emails}  
          />
        </div>
        <div className="flex-1 hidden md:block">
          <EmailView email={selectedEmail} />  // This should now receive the selected email
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Mail
