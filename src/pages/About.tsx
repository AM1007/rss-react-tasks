import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 p-8">
      <div className="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-800">About</h1>
        <p className="mt-4 text-slate-700">
          This application searches Star Trek characters via the STAPI API. It is built as part of
          the RSSchool React course.
        </p>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-slate-800">Author</h2>
          <p className="mt-2 text-slate-700">
            Andrew Motko (
            <a
              href="https://github.com/AM1007"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>
            )
          </p>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-slate-800">Course</h2>
          <p className="mt-2">
            <a
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              RS School React Course
            </a>
          </p>
        </div>
        <div className="mt-8">
          <Link
            to="/"
            className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
