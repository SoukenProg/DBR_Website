"use client";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";

const Schema = z.object({
    name: z.string().min(1, "必須です"),
    discordId: z.string().min(2, "必須です"),
    purpose: z.string().optional(),
    bio: z.string().optional(),
    agree: z.literal(true, {errorMap: () => ({message: "同意が必要です"})}),
});
type FormData = z.infer<typeof Schema>;
export default function DiscordPage() {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<FormData>({resolver: zodResolver(Schema)});
    const [done, setDone] = useState(false);
    const onSubmit = async (data: FormData) => {
        const res = await fetch("/api/forms/discord-apply", {method: "POST", body: JSON.stringify(data)});
        if (res.ok) setDone(true)
    };
    if (done) return (
        <div className="container py-12"><h1 className="text-2xl font-bold mb-4">送信ありがとうございました</h1>
            <p>確認後にご連絡します。</p></div>);
    return (<div className="container py-12"><h1 className="text-2xl font-bold mb-6">Discord 参加案内</h1><p
        className="text-white/80 mb-6">制作進捗共有、フィードバック、先行公開などを行っています。外部フォームに切り替える場合は、このページを
        iframe に差し替えてください。</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
            <div><label className="block mb-1">お名前（HN）</label><input {...register("name")}
                                                                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2"/>{errors.name &&
                <p className="text-red-400 text-sm">{errors.name.message}</p>}</div>
            <div><label className="block mb-1">Discord ID</label><input {...register("discordId")}
                                                                        placeholder="souken521"
                                                                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2"/>{errors.discordId &&
                <p className="text-red-400 text-sm">{errors.discordId.message}</p>}</div>
            <div><label className="block mb-1">参加目的（任意）</label><input {...register("purpose")}
                                                                            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2"/>
            </div>
            <div><label className="block mb-1">自己紹介（任意）</label><textarea {...register("bio")} rows={4}
                                                                               className="w-full bg-white/5 border border-white/10 rounded px-3 py-2"/>
            </div>
            <div className="flex items-center gap-2"><input type="checkbox" {...register("agree")} id="agree"/><label
                htmlFor="agree">プライバシーポリシーに同意します</label></div>
            {errors.agree && <p className="text-red-400 text-sm">{errors.agree.message}</p>}
            <button disabled={isSubmitting}
                    className="px-4 py-2 rounded bg白 text-black font-semibold disabled:opacity-60">送信
            </button>
        </form>
    </div>)
}