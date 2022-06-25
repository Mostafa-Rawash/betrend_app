from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in betrend/__init__.py
from betrend import __version__ as version

setup(
	name="betrend",
	version=version,
	description="graduatio project",
	author="Motafa Rawash",
	author_email="mostafa@rawash.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
