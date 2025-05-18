import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
  const currentUser = {
    name: "Lalit Vavdara",
    email: "lalit.vd.dev@gmail.com",
    bio: "Passionate about health tech and building innovative solutions. Loves coding with Next.js and Tailwind CSS.",
    joinedDate: "January 15, 2023",
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-foreground">User Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Details about your VitalSync account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="profileNameView" className="text-sm font-medium text-muted-foreground">Full Name</Label>
            <p id="profileNameView" className="text-lg text-foreground">{currentUser.name}</p>
          </div>
          <div>
            <Label htmlFor="profileEmailView" className="text-sm font-medium text-muted-foreground">Email Address</Label>
            <p id="profileEmailView" className="text-lg text-foreground">{currentUser.email}</p>
          </div>
          <div>
            <Label htmlFor="profileBioView" className="text-sm font-medium text-muted-foreground">Biography</Label>
            <p id="profileBioView" className="text-foreground whitespace-pre-line">{currentUser.bio}</p>
          </div>
          <div>
            <Label htmlFor="profileJoinedView" className="text-sm font-medium text-muted-foreground">Joined</Label>
            <p id="profileJoinedView" className="text-foreground">{currentUser.joinedDate}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue={currentUser.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={currentUser.email} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Biography</Label>
            <Textarea id="bio" defaultValue={currentUser.bio} rows={5} className="min-h-[100px]" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
