// components/registerForm.jsx
'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import apiClient from "@/lib/apiClient"
import { useRouter } from 'next/navigation'

export function RegisterForm({
  className,
  ...props
}) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // 表单验证
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match')
    }
    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters')
    }

    try {
      const res = await apiClient.post("/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password
      })

      if (res.data.status === 201) {
        router.push("/login")
      } else {
        router.push("/")
        }
    } catch (err) {
        console.log("Response status:", res.status)
      setError(err.response?.data?.message || 'Email is already in use')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* 错误提示 */}
              {error && <div className="text-red-500 text-sm">{error}</div>}

              {/* 用户名 */}
              <div className="grid gap-2">
                <Label htmlFor="username">Your name</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="First and last name"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* 邮箱 */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* 密码 */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* 确认密码 */}
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Re-enter password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full text-black rounded-full border-black bg-yellow-400 hover:bg-yellow-500">
                Continue
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
                Already have an account?&nbsp;
              <a href="/login" className="underline underline-offset-4">
                Sign in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}