
export const foundItem = (userId: string, itemId: string) => {
}

const SignIn = async (formData: FormData) => {
    const [ email, password ] = formData;
    const res = await fetch('/api/auth/signin',
        
    );
}